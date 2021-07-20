import React from "react";
import useStorage from "../../hooks/useStorage";
import PropTypes from "prop-types";

export const AppContext = React.createContext({ token: null });

const AppProvider = ({ children }) => {
  const { getValue, saveValue } = useStorage();

  const [token, setToken] = React.useState(null);

  const onLoadToken = React.useCallback(() => {
    const load = async () => {
      const tk = await getValue("SECRET_TOKEN_KEY");

      setToken(tk);
    };

    load();
  }, [token]);

  const onSetToken = React.useCallback((value) => {
    setToken(value);

    saveValue("SECRET_TOKEN_KEY", value);
  }, []);

  React.useEffect(onLoadToken, []);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken: onSetToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
