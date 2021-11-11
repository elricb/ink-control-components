const http = require("http");
const https = require("https");
const {existsSync} = require("fs");
const React = require("react");
const PropTypes = require("prop-types");

const GateHttp = ({
  options,
  data,
  children,
  onData,
  onDone,
  onError,
  gateFalse = null,
  gateNull = null,
  isHttps = true
}) => {
  const [resolve, setResolve] = React.useState(null);

  React.useEffect(() => {
    let body = "";

    const request = (isHttps ? https : http).request(options, response => {
      response.on("data", data => {
        if (typeof onData === "function") {
          onData(data);
        } else {
          body += data;
        }
      });

      response.on("end", () => {
        if (typeof onDone === "function") {
          const {
            secureConnecting,
            servername,
            alpnProtocol,
            authorized,
            authorizationError,
            encrypted,
            httpVersionMajor,
            httpVersionMinor,
            httpVersion,
            complete,
            headers,
            trailers,
            rawTrailers,
            aborted,
            upgrade,
            url,
            method,
            statusCode,
            statusMessage
          } = response;

          onDone({
            body,
            secureConnecting,
            servername,
            alpnProtocol,
            authorized,
            authorizationError,
            encrypted,
            httpVersionMajor,
            httpVersionMinor,
            httpVersion,
            complete,
            headers,
            trailers,
            rawTrailers,
            aborted,
            upgrade,
            url,
            method,
            statusCode,
            statusMessage
          });
        }

        setResolve(true);
      });
    });

    request.on("error", error => {
      if (typeof onError === "function") {
        onError(error);
      }

      setResolve(false);
    });

    if (data) {
      request.write(data);
    }

    request.end();
  }, []);

  return resolve === true ? children : resolve === false ? gateFalse : gateNull;
};

GateHttp.propTypes = {
  options: PropTypes.object.isRequired,
  children: PropTypes.any,
  data: PropTypes.any,
  gateFalse: PropTypes.any,
  gateNull: PropTypes.any,
  onData: PropTypes.func,
  onDone: PropTypes.func,
  onError: PropTypes.func
};

module.exports = GateHttp;
