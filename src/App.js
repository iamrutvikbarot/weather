import { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Chip,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { API_KEY, url } from "./apiHandler";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    Width: 1500,
    fontSize: "1.5rem",
  },
});

function App() {
  const [searchText, setSearchText] = useState("Ahmedabad");
  const [cityData, setCityData] = useState([]);
  const [value, setValue] = useState(false);
  const [width, setWidth] = useState(window.screen.width);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.screen.width);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.screen.width);
      });
    };
  }, [width]);

  //method for call API for weather
  useEffect(() => {
    const fatchAPI = async () => {
      const response = await fetch(
        url + searchText + "&appid=" + API_KEY + "&units=metric"
      );
      const json = await response.json();
      setCityData(json);
      console.log("response", json);
    };
    fatchAPI();
  }, [searchText]);

  //method for get value for change Celsius -> Fahrenheit or Fahrenheit -> Celsius
  const getValue = () => {
    if (value === false) {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  //method for change temp value Celsius -> Fahrenheit or Fahrenheit -> Celsius
  const getTempValue = (temp) => {
    if (value === true) {
      return ((temp * 9) / 5 + 32).toFixed(2);
    } else {
      return temp.toFixed(2);
    }
  };

  //method for get Time from milliseconds
  const getTime = (milliseconds) => {
    const dateFromString = milliseconds.toString() + "000";
    const dateObj = new Date(parseFloat(dateFromString));
    const localDate = dateObj.toLocaleString();
    return localDate;
  };

  const sendSearchText = (value) => {
    if (value.length > 0) {
      setSearchText(value);
    } else {
      setSearchText("Ahmedabad");
    }
  };

  const temp = cityData.main !== undefined && getTempValue(cityData.main.temp); // give temp value
  const tempMax =
    cityData.main !== undefined && getTempValue(cityData.main.temp_max); // give maximum temp value
  const tempMin =
    cityData.main !== undefined && getTempValue(cityData.main.temp_min); // give minimum temp value
  const humidity = cityData.main !== undefined && cityData.main.humidity; // give minimum Humidity value
  const name = cityData.main !== undefined && cityData.name; // give city name value
  const country = cityData.sys !== undefined && cityData.sys.country; // give city name value
  const icon = cityData.weather !== undefined && cityData.weather[0].icon; // give icon value
  const title = cityData.weather !== undefined && cityData.weather[0].main; // give tolltip value
  const degValue = value === true ? "°F" : "°C"; // give degree value

  return (
    <>
      {width > 780 ? (
        <div className="mainBox" style={{ paddingTop: "1rem" }}>
          <div className="input" style={{ textAlign: "center" }}>
            <input
              type="search"
              className="inputTagCSS"
              onChange={(e) => sendSearchText(e.target.value)}
            />
          </div>
          {cityData.main !== undefined && (
            <div>
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  background: "dimgrey",
                  opacity: "0.8",
                  color: "#FFF",
                  borderRadius: "2rem",
                  padding: "0 1rem",
                  marginRight: "1rem",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      color="error"
                      onClick={() => {
                        getValue();
                      }}
                    />
                  }
                  label={value === true ? "Fahrenheit" : "Celsius"}
                />
              </div>
            </div>
          )}
          {cityData.main !== undefined ? (
            <>
              <Table
                style={{
                  marginTop: "3rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <Chip
                        label="Temperature"
                        style={{
                          background: "black",
                          fontSize: "1rem",
                          color: "white",
                          width: "9rem",
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <Chip
                        label="Minimum"
                        style={{
                          background: "black",
                          fontSize: "1rem",
                          color: "white",
                          width: "9rem",
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <Chip
                        label="Maximum"
                        style={{
                          background: "black",
                          fontSize: "1rem",
                          color: "white",
                          width: "9rem",
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <CustomWidthTooltip title={title} placement="top" arrow>
                        <Button>
                          <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt=""
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "aqua",
                              height: "3rem",
                            }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <Typography
                        style={{
                          fontSize: width < 1020 ? "1.5rem" : "3rem",
                          background: "dimgrey",
                          opacity: "0.8",
                          color: "#FFF",
                          borderRadius: "2rem",
                        }}
                      >
                        {temp + degValue}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <Typography
                        style={{
                          fontSize: width < 1020 ? "1.5rem" : "3rem",
                          background: "dimgrey",
                          opacity: "0.8",
                          color: "#FFF",
                          borderRadius: "2rem",
                        }}
                      >
                        {tempMin + degValue}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <Typography
                        style={{
                          fontSize: width < 1020 ? "1.5rem" : "3rem",
                          background: "dimgrey",
                          opacity: "0.8",
                          color: "#FFF",
                          borderRadius: "2rem",
                        }}
                      >
                        {tempMax + degValue}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ border: "none", textAlign: "center" }}>
                      <Typography
                        style={{
                          fontSize: width < 900 ? "1rem" : "1.5rem",
                          background: "dimgrey",
                          opacity: "0.8",
                          color: "#FFF",
                          borderRadius: "2rem 2rem 0 0",
                        }}
                      >
                        {name},{country}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: width < 900 ? "1rem" : "1.5rem",
                          background: "dimgrey",
                          opacity: "0.8",
                          color: "#FFF",
                          borderRadius: "0 0 2rem 2rem",
                        }}
                      >
                        {getTime(cityData.dt)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div
                style={{
                  marginTop: "3rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      border: "none",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1rem",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                      }}
                    >
                      <CustomWidthTooltip title={"Wind"} placement="top" arrow>
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/4005/4005767.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {cityData.wind.speed} meter/sec
                      </Typography>
                    </div>

                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1rem",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                      }}
                    >
                      <CustomWidthTooltip
                        title={"Humidity"}
                        placement="top"
                        arrow
                      >
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/9290/9290540.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {humidity}%
                      </Typography>
                    </div>

                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1rem",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                      }}
                    >
                      <CustomWidthTooltip
                        title={"Sunrise Time"}
                        placement="top"
                        arrow
                      >
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/8098/8098355.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {getTime(cityData.sys.sunrise)}
                      </Typography>
                    </div>
                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1rem",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                      }}
                    >
                      <CustomWidthTooltip
                        title={"Sunset Time"}
                        placement="top"
                        arrow
                      >
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/8098/8098358.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {getTime(cityData.sys.sunset)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h2 style={{ textAlign: "center" }}>There is No Data</h2>
          )}
        </div>
      ) : (
        <div className="mainBox" style={{ paddingTop: "1rem" }}>
          <div className="input" style={{ textAlign: "center" }}>
            <input
              type="search"
              className="inputTagCSSM"
              onChange={(e) => sendSearchText(e.target.value)}
            />
          </div>
          {cityData.main !== undefined && (
            <div>
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  background: "dimgrey",
                  opacity: "0.8",
                  color: "#FFF",
                  borderRadius: "2rem",
                  padding: "0 1rem",
                  margin: "1rem",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      color="error"
                      onClick={() => {
                        getValue();
                      }}
                    />
                  }
                  label={value === true ? "Fahrenheit" : "Celsius"}
                />
              </div>
            </div>
          )}
          {cityData.main !== undefined ? (
            <>
            <div
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      border: "none",
                      textAlign: "center",
                      display: "flex",
                      flexDirection:'column',
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                       <Chip
                        label="Temperature:"
                        style={{
                          background: "black",
                          fontSize: "1rem",
                          color: "white",
                        }}
                      />
                     <Typography
                        style={{
                          fontSize: '1rem',
                        }}
                      >
                        {temp + degValue}
                      </Typography>
                    </div>

                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                     <Chip
                        label="Minimum:"
                        style={{
                          background: "black",
                          fontSize: "1rem",
                          color: "white",
                        }}
                      />
                     <Typography
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {tempMin + degValue}
                      </Typography>
                    </div>

                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                  <Chip
                        label="Maximum:"
                        style={{
                          background: "black",
                          fontSize: "1rem",
                          color: "white",
                        }}
                      />
                      <Typography
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {tempMax + degValue}
                      </Typography>
                    </div>
                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                      <CustomWidthTooltip title={title} placement="top" arrow>
                        <Button>
                          <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt=""
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "aqua",
                              height: "3rem",
                            }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {name},{country}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {getTime(cityData.dt)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      border: "none",
                      textAlign: "center",
                      display: "flex",
                      flexDirection:'column',
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                      <CustomWidthTooltip title={"Wind"} placement="top" arrow>
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/4005/4005767.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {cityData.wind.speed} meter/sec
                      </Typography>
                    </div>

                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                      <CustomWidthTooltip
                        title={"Humidity"}
                        placement="top"
                        arrow
                      >
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/9290/9290540.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {humidity}%
                      </Typography>
                    </div>

                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                      <CustomWidthTooltip
                        title={"Sunrise Time"}
                        placement="top"
                        arrow
                      >
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/8098/8098355.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {getTime(cityData.sys.sunrise)}
                      </Typography>
                    </div>
                    <div
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "black",
                        opacity: "0.8",
                        color: "#FFF",
                        borderRadius: "2rem",
                        width:'100%',
                        marginTop:'1rem',
                      }}
                    >
                      <CustomWidthTooltip
                        title={"Sunset Time"}
                        placement="top"
                        arrow
                      >
                        <Button>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/8098/8098358.png"
                            alt=""
                            style={{ borderRadius: "20%", height: "3rem" }}
                          />
                        </Button>
                      </CustomWidthTooltip>
                      <Typography
                        style={{ fontSize: "1.5rem", marginRight: "1rem" }}
                      >
                        {getTime(cityData.sys.sunset)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h2 style={{ textAlign: "center" }}>There is No Data</h2>
          )}
        </div>
      )}
    </>
  );
}

export default App;
