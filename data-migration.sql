-- 1. 데이터 변환: timestamp를 YYYY-MM-DD HH:MM:SS 형식으로 변환
UPDATE nihilog.user_info
SET
  crt_dt = TO_CHAR(crt_dt::timestamp, 'YYYY-MM-DD HH24:MI:SS'),
  updt_dt = TO_CHAR(updt_dt::timestamp, 'YYYY-MM-DD HH24:MI:SS'),
  last_lgn_dt = CASE
    WHEN last_lgn_dt IS NOT NULL
    THEN TO_CHAR(last_lgn_dt::timestamp, 'YYYY-MM-DD HH24:MI:SS')
    ELSE NULL
  END,
  last_pswd_chg_dt = CASE
    WHEN last_pswd_chg_dt IS NOT NULL
    THEN TO_CHAR(last_pswd_chg_dt::timestamp, 'YYYY-MM-DD HH24:MI:SS')
    ELSE NULL
  END,
  del_dt = CASE
    WHEN del_dt IS NOT NULL
    THEN TO_CHAR(del_dt::timestamp, 'YYYY-MM-DD HH24:MI:SS')
    ELSE NULL
  END;

-- 2. 변환된 데이터 확인 (선택사항)
SELECT
  user_no,
  crt_dt,
  updt_dt,
  last_lgn_dt,
  last_pswd_chg_dt,
  del_dt
FROM nihilog.user_info
LIMIT 5;