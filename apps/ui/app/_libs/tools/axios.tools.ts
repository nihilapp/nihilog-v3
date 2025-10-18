'use client';

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios';

import { RESPONSE_CODE } from '@/_code/response.code';
import { siteConfig } from '@/_config/config';
import type { ResponseType } from '@/_schemas/response.schema';

/**
 * HTTP 클라이언트 유틸리티
 * Axios 기반의 API 요청을 위한 헬퍼 클래스
 */
export class Api {
  private static instance: AxiosInstance | null = null;
  private static baseURL = `${siteConfig.api.route}`;

  private static config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: this.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**
   * 비즈니스 에러(Response code) 처리를 표준화합니다.
   * 서버가 200을 반환해도 `code` 가 SUCCESS 가 아니면 AxiosError 로 throw 합니다.
   */
  private static ensureOk<T>(res: AxiosResponse<ResponseType<T>>): ResponseType<T> {
    const payload = res.data;

    // 성공 응답 코드 목록
    const successCodes = [
      RESPONSE_CODE.SUCCESS, // 200
      RESPONSE_CODE.CREATED, // 201
      RESPONSE_CODE.NO_CONTENT, // 204
    ];

    if (payload.error || !successCodes.includes(payload.code as any)) {
      // AxiosError 로 변환하여 React Query 등에서 에러 흐름으로 처리되도록 함
      const axiosError = new AxiosError(
        payload.message,
        payload.code,
        res.config,
        undefined,
        res
      );
      throw axiosError;
    }

    return payload;
  }

  /**
   * 싱글턴 Axios 인스턴스를 생성하고 반환합니다.
   */
  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create(this.config);

      // 요청 인터셉터: withCredentials 강제 적용 및 디버깅
      this.instance.interceptors.request.use(
        (config) => {
          // withCredentials가 명시적으로 false가 아니면 항상 true로 설정
          if (config.withCredentials !== false) {
            config.withCredentials = true;
          }

          // 개발 환경에서 요청 로깅
          if (process.env.NODE_ENV === 'development') {
            console.log(
              '[API Request]',
              {
                method: config.method?.toUpperCase(),
                url: config.url,
                baseURL: config.baseURL,
                withCredentials: config.withCredentials,
              }
            );
          }

          return config;
        },
        (error) => {
          console.error(
            '[API Request Error]',
            error
          );
          return Promise.reject(error);
        }
      );

      // 응답 인터셉터: CORS 에러 디버깅
      this.instance.interceptors.response.use(
        (response) => response,
        (error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error(
              '[API Response Error]',
              {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                url: error.config?.url,
                isCorsError: error.message?.includes('CORS') || error.message?.includes('Network Error'),
              }
            );
          }
          return Promise.reject(error);
        }
      );
    }
    return this.instance;
  }

  /**
   * GET 요청을 수행합니다.
   */
  static async get<T>(restApi: string, config?: AxiosRequestConfig) {
    return this.getInstance().get<ResponseType<T>>(
      restApi,
      config
    );
  }

  /**
   * POST 요청을 수행합니다.
   */
  static async post<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().post<
      T,
      AxiosResponse<ResponseType<T>, P>,
      P
    >(
      restApi,
      data,
      config
    );
  }

  /**
   * 파일 업로드를 위한 POST 요청을 수행합니다.
   */
  static async postWithFile<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().post<
      T,
      AxiosResponse<ResponseType<T>, P>,
      P
    >(
      restApi,
      data,
      {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  /**
   * PATCH 요청을 수행합니다.
   */
  static async patch<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().patch<
      T,
      AxiosResponse<ResponseType<T>, P>,
      P
    >(
      restApi,
      data,
      config
    );
  }

  /**
   * PUT 요청을 수행합니다.
   */
  static async put<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().put<
      T,
      AxiosResponse<ResponseType<T>, P>,
      P
    >(
      restApi,
      data,
      config
    );
  }

  /**
   * DELETE 요청을 수행합니다.
   */
  static async delete<T>(restApi: string, config?: AxiosRequestConfig) {
    return this.getInstance().delete<ResponseType<T>>(
      restApi,
      config
    );
  }

  /**
   * GET 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async getQuery<D>(url: string) {
    const res = await this.get<D>(url);
    return this.ensureOk<D>(res);
  }

  /**
   * POST 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async postQuery<D, P>(url: string, postData: P) {
    const res = await this.post<D, P>(
      url,
      postData
    );
    return this.ensureOk<D>(res);
  }

  /**
   * PATCH 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async patchQuery<D, P>(url: string, patchData: P) {
    const res = await this.patch<D, P>(
      url,
      patchData
    );
    return this.ensureOk<D>(res);
  }

  /**
   * PUT 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async putQuery<D, P>(url: string, putData: P) {
    const res = await this.put<D, P>(
      url,
      putData
    );
    return this.ensureOk<D>(res);
  }

  /**
   * DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async deleteQuery<D>(url: string) {
    const res = await this.delete<D>(url);
    return this.ensureOk<D>(res);
  }

  /**
   * 데이터와 함께 DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async deleteWithDataQuery<D, P>(url: string, postData: P) {
    const res = await this.delete<D>(
      url,
      {
        data: postData,
      }
    );
    return this.ensureOk<D>(res);
  }

  /**
   * 여러 데이터를 삭제하는 DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   */
  static async deletesQuery<D, P>(url: string, deleteData: P) {
    const res = await this.delete<D>(
      url,
      {
        data: deleteData,
      }
    );
    return this.ensureOk<D>(res);
  }
}
