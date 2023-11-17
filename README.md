# PDF Latex

<p align="center">PdfLatex is a straightforward project designed to generate PDFs on the server using LaTeX under the hood.</p>
<p align="center">

## Description
Originally developed for `Afweba` (a medical web app), this project serves the purpose of generating PDF reports in the cloud.

## Dependencies
- LaTeX
- Docker
- Node.js

## Running for Production
The easiest way to run the application in production mode is by using Docker. The following steps demonstrate how to achieve this using the powerful `GNU make` command.

### Build and Start
```bash
$ make build # Build the Docker image
$ make start # Start the container 
```

The application should now be listening on port **8080** with the endpoint `http://localhost:8080/pdflatex/compile` for the compiler. You can use the provided example payload file **payload.example.json** to make a request using tools like `Postman` or `Insomnia`.

```bash
curl -X 'POST' \
  'http://localhost:8080/pdflatex/compile' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d @payload.example.json \
  --output report.pdf
```

### Swagger UI Documentation
Explore the API documentation using the Swagger UI at [http://localhost:8080/swagger-ui](http://localhost:8080/swagger-ui).

## Clean Up
```bash
$ make stop # Stop the Docker container
$ make clean # Remove the Docker image from the registry
```

## Running for Development

### Installation
```bash
$ yarn install
```

### Running the App
For local development, copy the `.env` to `.env.local`.
```bash
$ cp .env .env.local
```

Then run the following commands:
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Testing
```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e
```
## Contribution

Feel free to contribute to this project.

Build with :green_heart: by [@mrzdevcore](https://github.com/mrzdevcore)