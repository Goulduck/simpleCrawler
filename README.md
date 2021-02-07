# simpleCrawler
## A simple web crawler to get page links

A 'simple' implementation of a program that crawls the Internet, starting with a given website and building a graph of all the pages it links to, and all the pages they link to – and so on and so forth, recursively.

------------

#### Instructions

To run project clone this directory and run `npm i`.
Tests can then be run by using `npm test`.

Alternatively, to run your own commands:

`node ./src/Crawler.js 'YOUR_STARTING_URL_HERE' MAX_DEPTH EXT_ONLY` 
-- MAX_DEPTH in an integer stating the number of urls you want to crawl (defaults to 10)
-- EXT_ONLY in a boolean declaring that whether you want to crawl internal links i.e. '\foo\bar' (defaults to false - internal not yet implemented)

------------

#### What's Next?
* Interal links - currently not working as no base url is present
* TESTS!!!! Intended to use TDD but due to time constraints decided to get a base implementation in place first
