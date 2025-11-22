'use client';

import type { ResponseType } from '@nihilog/schemas';
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios';

import { RESPONSE_CODE } from '@/_code/response.code';
import { siteConfig } from '@/_config/config';

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
   * @description 비즈니스 에러(Response code) 처리를 표준화합니다.
   * 서버가 200을 반환해도 `code` 가 SUCCESS 가 아니면 AxiosError 로 throw 합니다.
   * @param res - Axios 응답 객체
   */
  private static ensureOk<TData>(res: AxiosResponse<ResponseType<TData>>): ResponseType<TData> {
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
   * @description 싱글턴 Axios 인스턴스를 생성하고 반환합니다.
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
            const errorInfo: Record<string, unknown> = {};

            // 기본 에러 정보
            if (error.message) {
              errorInfo.message = error.message;
            }
            if (error.code) {
              errorInfo.code = error.code;
            }

            // 응답이 있는 경우 (서버 에러)
            if (error.response) {
              errorInfo.status = error.response.status;
              errorInfo.statusText = error.response.statusText;
              errorInfo.data = error.response.data;
              errorInfo.headers = error.response.headers;
            }

            // 요청은 보냈지만 응답을 받지 못한 경우
            if (error.request) {
              errorInfo.request = error.request;
            }

            // 요청 설정 정보
            if (error.config) {
              errorInfo.url = error.config.url;
              errorInfo.method = error.config.method;
              errorInfo.baseURL = error.config.baseURL;
            }

            // CORS 에러 확인
            const errorMessage = error.message || '';
            errorInfo.isCorsError = errorMessage.includes('CORS') || errorMessage.includes('Network Error');

            console.error(
              '[API Response Error]',
              errorInfo
            );
          }
          return Promise.reject(error);
        }
      );
    }
    return this.instance;
  }

  /**
   * @description GET 요청을 수행합니다.
   * @param restApi - API 엔드포인트
   * @param config - Axios 요청 설정
   */
  static async get<TData>(restApi: string, config?: AxiosRequestConfig) {
    return this.getInstance().get<ResponseType<TData>>(
      restApi,
      config
    );
  }

  /**
   * @description Data가 포함된 GET 요청을 수행합니다.
   * @param restApi - API 엔드포인트
   * @param data - 요청 데이터
   * @param config - Axios 요청 설정
   */
  static async getWithData<TData, TBody>(
    restApi: string,
    data: TBody,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().get<ResponseType<TData>>(
      restApi,
      {
        ...config,
        data,
      }
    );
  }

  /**
   * @description POST 요청을 수행합니다.
   * @param restApi - API 엔드포인트
   * @param data - 요청 데이터
   * @param config - Axios 요청 설정
   */
  static async post<TData, TBody>(
    restApi: string,
    data: TBody,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().post<
      TData,
      AxiosResponse<ResponseType<TData>, TBody>,
      TBody
    >(
      restApi,
      data,
      config
    );
  }

  /**
   * @description 파일 업로드를 위한 POST 요청을 수행합니다.
   * @param restApi - API 엔드포인트
   * @param data - 요청 데이터
   * @param config - Axios 요청 설정
   */
  static async postWithFile<TData, TBody>(
    restApi: string,
    data: TBody,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().post<
      TData,
      AxiosResponse<ResponseType<TData>, TBody>,
      TBody
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
   * @description PATCH 요청을 수행합니다.
   * @param restApi - API 엔드포인트
   * @param data - 요청 데이터
   * @param config - Axios 요청 설정
   */
  static async patch<TData, TBody>(
    restApi: string,
    data: TBody,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().patch<
      TData,
      AxiosResponse<ResponseType<TData>, TBody>,
      TBody
    >(
      restApi,
      data,
      config
    );
  }

  /**
   * @description PUT 요청을 수행합니다.
   * @param restApi - API 엔드포인트
   * @param data - 요청 데이터
   * @param config - Axios 요청 설정
   */
  static async put<TData, TBody>(
    restApi: string,
    data: TBody,
    config?: AxiosRequestConfig
  ) {
    return this.getInstance().put<
      TData,
      AxiosResponse<ResponseType<TData>, TBody>,
      TBody
    >(
      restApi,
      data,
      config
    );
  }

  /**
   * @description DELETE 요청을 수행합니다.
   * @param restApi - API 엔드포인트
   * @param config - Axios 요청 설정
   */
  static async delete<TData>(restApi: string, config?: AxiosRequestConfig) {
    return this.getInstance().delete<ResponseType<TData>>(
      restApi,
      config
    );
  }

  /**
   * @description GET 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   */
  static async getQuery<TData>(url: string) {
    const res = await this.get<TData>(url);
    return this.ensureOk<TData>(res);
  }

  /**
   * @description Data가 포함된 GET 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   * @param bodyData - 요청 데이터
   */
  static async getWithDataQuery<TData, TBody>(
    url: string,
    bodyData: TBody
  ) {
    const res = await this.getWithData<TData, TBody>(
      url,
      bodyData
    );
    return this.ensureOk<TData>(res);
  }

  /**
   * @description POST 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   * @param postData - 요청 데이터
   */
  static async postQuery<TData, TBody>(url: string, postData: TBody) {
    const res = await this.post<TData, TBody>(
      url,
      postData
    );
    return this.ensureOk<TData>(res);
  }

  /**
   * @description PATCH 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   * @param patchData - 요청 데이터
   */
  static async patchQuery<TData, TBody>(url: string, patchData: TBody) {
    const res = await this.patch<TData, TBody>(
      url,
      patchData
    );
    return this.ensureOk<TData>(res);
  }

  /**
   * @description PUT 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   * @param putData - 요청 데이터
   */
  static async putQuery<TData, TBody>(url: string, putData: TBody) {
    const res = await this.put<TData, TBody>(
      url,
      putData
    );
    return this.ensureOk<TData>(res);
  }

  /**
   * @description DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   */
  static async deleteQuery<TData>(url: string) {
    const res = await this.delete<TData>(url);
    return this.ensureOk<TData>(res);
  }

  /**
   * @description 데이터와 함께 DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   * @param postData - 요청 데이터
   */
  static async deleteWithDataQuery<TData, TBody>(url: string, postData: TBody) {
    const res = await this.delete<TData>(
      url,
      {
        data: postData,
      }
    );
    return this.ensureOk<TData>(res);
  }

  /**
   * @description 여러 데이터를 삭제하는 DELETE 요청을 수행하고 응답 데이터만 반환합니다.
   * @param url - API 엔드포인트
   * @param deleteData - 삭제할 데이터
   */
  static async deletesQuery<TData, TBody>(url: string, deleteData: TBody) {
    const res = await this.delete<TData>(
      url,
      {
        data: deleteData,
      }
    );
    return this.ensureOk<TData>(res);
  }
}
