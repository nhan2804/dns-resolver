# DNS Resolver API

## Overview

The DNS Resolver API is a lightweight service for resolving domain names to IP addresses using customizable DNS servers. It includes a built-in mechanism to specify custom DNS resolvers for different types, along with a Terms of Service endpoint.

## Features

- Resolve domain names using specified DNS servers.
- Support for custom DNS configurations based on type (e.g., Viettel).
- Terms of Service endpoint to provide usage guidelines.
- Disclaimer included in responses to encourage legitimate use.

## Endpoints

### `GET /resolve`

Resolve a domain name to its IP addresses using the specified DNS server type.

#### Query Parameters

| Parameter | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| `domain`  | string | The domain name to resolve.                      |
| `type`    | string | The type of DNS server to use (e.g., `Viettel`). |

#### Example Request

```http
GET /resolve?domain=example.com&type=Viettel
```

#### Example Response

**Success:**

```json
{
  "domain": "example.com",
  "addresses": ["93.184.216.34"]
}
```

**Error:**

```json
{
  "error": "getaddrinfo ENOTFOUND invalid-domain.com"
}
```

### `GET /tos`

Retrieve the Terms of Service for the DNS Resolver API.

#### Example Response

```json
{
  "tos": "Terms of Service",
  "content": "This service is provided as-is for informational purposes only. Users must ensure compliance with applicable laws and regulations. Misuse of this service, including testing illegitimate or malicious domains, is strictly prohibited. The provider is not liable for any issues arising from the use of this service."
}
```

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. The server will run on `http://localhost:3000` by default.

### Environment Variables

| Variable | Default Value | Description                    |
| -------- | ------------- | ------------------------------ |
| `PORT`   | `3000`        | Port on which the server runs. |

## Usage Notes

- Ensure that the domain names provided are legitimate and comply with applicable laws.
- The API uses custom DNS servers defined in the `typeMapping` configuration.
- The `/resolve` endpoint includes a disclaimer to encourage responsible use.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find bugs or have feature suggestions.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
