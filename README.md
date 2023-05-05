
# Torrent Srapper CLI

Command line utility used for scrapping the torrents according to search and page params passed as arguments. It be used as dependency in the project also.


## Installation

Install torrent-scrapper-cli with npm globally

```bash
  npm install -g torrent-scrapper-cli  
```
Install torrent-scrapper-cli with npm locally in project

```bash
  npm install torrent-scrapper-cli  
```
    
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
 node ./bin/index.js -h
```


## Usage/Examples

Run the following command in the terminal after installing torrent-scrapper-cli to open help
eg. 
```bash
torrent-scrapper-cli -h
```
For getting torrents with name avatar
```bash
torrent-scrapper-cli -s='Avatar' -f=/home/atul/Documents/
```
For getting torrents with name avatar from only https://yts.mx

```bash
torrent-scrapper-cli -s='Avatar' -f=/home/atul/Documents/ -k=yts
```

## Authors

- [@Atuldubey98](https://github.com/Atuldubey98)

