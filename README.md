# Cryptocurrency Tracker

View the current and historical price of any cryptocurrency.

![Crypto Watch Screen Shot](./screenshot.png)

## Live Demo

[react-crypto-watcher.netlify.app](https://react-crypto-watcher.netlify.app/)

## Description

Built with React.js and using data from [CoinGecko](https://www.coingecko.com/)'s [API](https://www.coingecko.com/api/documentations/v3).

The current top 10 [cryptocurrencies](https://en.wikipedia.org/wiki/Cryptocurrency) (by market cap) are displayed at the top of the page.

You can click one of the top 10 to see current it's current & historical price or search for
any other cryptocurrency by name using the search bar.

Once a cryptocurrency has been selected and it's data is displayed, you can change the fiat currency (eg. AUD)
that it is being compared to. You can also adjust the timeframe of the historical price chart to various lengths between 7 days and 1 year.

The current price of the chosen cryptocurrency will appear in red if it's less than it was yesterday or green if it's greater than yesterday's price.

## Running the App Locally

### Prerequisites

You will need Node.js which can be downloaded [here](https://nodejs.org/).

### Installation

1. Download or clone this repository.

   ```sh
   git clone https://github.com/Jimfarrugia/react-pomodoro-timer.git
   ```

2. Navigate to the project's root folder and run the following command to install the required NPM packages.

   ```sh
   npm install
   ```

3. Start the development server by running the following command.

   ```sh
   npm run start
   ```

4. If it does not open automatically, open the application in your web browser at the following address:
   ```
   localhost:3000
   ```

### Contribution

Please feel free to submit issues and pull requests via Github if you'd like to contribute.

Any known bugs or publicly planned features can be found and can be found in the issues page of this repository.
