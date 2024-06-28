class WeatherForecast {
  constructor() {
    this.forecast = [];
  }

  addDayForecast(dt, dateTxt, icon, temperature, minTemperature, maxTemperature) {
    const date = dateTxt.split(" ")[0];
    const hours = new Date(dateTxt).getHours();

    // Check if date already exists in forecast array
    let dayForecast = this.forecast.find((day) => day.date === date);
    if (!dayForecast) {
      dayForecast = {
        dt: dt,
        date: date,
        temperatures: [],
        minTemperature: minTemperature,
        maxTemperature: maxTemperature,
        dayIcon: null,
        nightIcon: null,
      };
      this.forecast.push(dayForecast);
    }

    dayForecast.temperatures.push(temperature);
    dayForecast.minTemperature = Math.min(
      dayForecast.minTemperature,
      minTemperature
    );
    dayForecast.maxTemperature = Math.max(
      dayForecast.maxTemperature,
      maxTemperature
    );
    dayForecast.dayIcon =
      hours >= 10 && hours < 15 ? icon : dayForecast.dayIcon;
    dayForecast.nightIcon =
      hours >= 20 && hours < 24 ? icon : dayForecast.nightIcon;
  }
  
  getForecast() {
    return this.forecast;
  }

  static getAVGTemperature(temperatures) {
    if (temperatures.length === 0) {
      return 0;
    }

    const sum = temperatures.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum / temperatures.length;
  }
}

export default WeatherForecast;
