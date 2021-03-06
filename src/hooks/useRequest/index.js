import axios from "axios";
import React from "react";
import useToken from "../useToken";
import useLoading from "../useLoading";
import { withNull } from "exp-value";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

const useRequest = () => {
  const { setLoading } = useLoading();
  const { token, onResetToken } = useToken();
  const [status, setStatus] = React.useState(null);

  const headers = React.useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }),
    [token]
  );

  const onGetExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true);
        try {
          const { data } = await instance.get(url, { headers }, entity);
          setLoading(false);

          return data;
        } catch (error) {
          setStatus(withNull("response.status", error));
          setLoading(false);
        }
      };

      return execute();
    },
    [setLoading, headers]
  );

  const onPostExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true);
        try {
          const { data } = await instance.post(url, entity, {
            headers,
          });

          setLoading(false);
          return data;
        } catch (error) {
          setStatus(withNull("response.status", error));
          setLoading(false);
        }
      };
      return execute();
    },
    [setLoading, headers]
  );

  const onPutExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true);
        try {
          const { data } = await instance.post(url, entity, {
            headers,
          });
          setLoading(false);
          return data;
        } catch (error) {
          setStatus(withNull("response.status", error));
          setLoading(false);
        }
      };
      return execute();
    },
    [setLoading, headers]
  );

  const onDeleteExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true);
        try {
          const { data } = await instance.delete(url, entity, {
            headers,
          });
          setLoading(false);
          return data;
        } catch (error) {
          setStatus(withNull("response.status", error));
          setLoading(false);
        }
      };
      return execute();
    },
    [setLoading, headers]
  );

  const onStatusHandler = React.useCallback(() => {
    const execute = async () => {
      switch (status) {
        case 400:
          break;
        case 401:
          await onResetToken();

          break;
        default:
          break;
      }
    };

    if (status) execute();
  }, [onResetToken, status]);

  React.useEffect(onStatusHandler, [status, onStatusHandler]);

  return { onGetExecute, onPostExecute, onPutExecute, onDeleteExecute };
};

export default useRequest;
