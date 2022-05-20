# Covid-19 tracker

## [Hosted Version](https://donblizy-covid19.netlify.app/)

A simple COVID-19 tracker. It is tracking cases/deaths/recoveries for each country through API calls through Axios.
The project is using Material UI (MUI) for cards/grids and react-chartjs-2 for charts.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Installing

Clone the repository by inputting the following in your command line terminal

```
git clone https://github.com/donblizy/COVID19-tracker.git
```

Once cloned, navigate to that directory in your terminal and run the below command to install all of the dependencies needed as found in the package.json file. The command is:

```
npm i
```

Launch the app in your browser:

```
npm start
```

## Built With

- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces

## APIs

- COVID-19 Worldometers used for more accurate real-time data as it updates more frequently.
- COVID-19 JHUCSSE used for historic data. It updates multiple times per day but fewer than above.
- [Endpoints for both](https://disease.sh/docs/)
