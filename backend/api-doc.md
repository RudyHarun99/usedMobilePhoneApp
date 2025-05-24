# API Documentation

## Endpoints

### Get All Products
- **URL**: `/api/trpc/products`
- **Method**: `GET`
- **Procedure**: `list`
- **Request**: No parameters required
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
    {
      "result": {
        "data": {
          "products": [
            "<array of product[]>"
          ],
          "metadata": {
            "total": "<number>",
            "limit": "<number>",
            "offset": "<number>",
            "hasMore": "<boolean>"
          }
        }
      }
    }
  ```
- **Errors**:
  - **Status**: `404 Not Found`
  - **Body**:
  ```json
    {
      "error": {
        "code": "NOT_FOUND",
        "timestamp": "<timestamp>",
        "type": "TRPC_ERROR"
      }
    }
  ```

### Search, Filter, Sort, Limit, Offset Products
- **URL**: `/api/trpc/products`
- **Method**: `GET`
- **Procedure**: `list`
- **Request**:
  - **Query**: `input`
    ```json
      {
        "search": "<string optional>",
        "minPrice": "<number optional>",
        "maxPrice": "<number optional>",
        "mininumOrderQuantity": "<number optional>",
        "inStock": "<boolean optional>",
        "sortBy": [
            "name", "price", "stockQuantity", "createdAt"
          ]"optional",
        "sortOrder": [ "asc", "desc" ]"optional",
        "limit": "<number optional>",
        "offset": "<number optional>"
      }
    ```
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
    {
      "result": {
        "data": {
          "products": [
            "<array of product[]>"
          ],
          "metadata": {
            "total": "<number>",
            "limit": "<number>",
            "offset": "<number>",
            "hasMore": "<boolean>"
          }
        }
      }
    }
  ```
- **Errors**:
  - **Status**: `404 Not Found`
  - **Body**:
  ```json
    {
      "error": {
        "code": "NOT_FOUND",
        "timestamp": "<timestamp>",
        "type": "TRPC_ERROR"
      }
    }
  ```

### Get Product By Id
- **URL**: `/api/trpc/products`
- **Method**: `GET`
- **Procedure**: `getById`
- **Request**: 
  - **Query**: `input="<string product id>"`
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
    {
      "result": {
        "data": {
          "id": "<string>",
          "sku": "<string>",
          "slug": "<string>",
          "name": "<string>",
          "description": "<string>",
          "price": "<number decimal>",
          "imageUrl": "<string>",
          "stockQuantity": "<number>",
          "minimumOrderQuantity": "<number>",
          "createdAt": "<string>",
          "updatedAt": "<string>"
        }
      }
    }
  ```
- **Errors**:
  - **Status**: `404 Not Found`
  - **Body**:
  ```json
    {
      "error": {
        "code": "NOT_FOUND",
        "timestamp": "<timestamp>",
        "type": "TRPC_ERROR"
      }
    }
  ```

### Create Product
- **URL**: `/api/trpc/products`
- **Method**: `POST`
- **Procedure**: `create`
- **Request**:
  - **Body**: `JSON`
  ```json
    {
      "sku": "<string>",
      "slug": "<string>",
      "name": "<string>",
      "description": "<string>",
      "price": "<number decimal>",
      "imageUrl": "<string>",
      "stockQuantity": "<number>",
      "minimumOrderQuantity": "<number>",
    }
  ```
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
    {
      "result": {
        "data": {
          "id": "<string>",
          "sku": "<string>",
          "slug": "<string>",
          "name": "<string>",
          "description": "<string>",
          "price": "<number decimal>",
          "imageUrl": "<string>",
          "stockQuantity": "<number>",
          "minimumOrderQuantity": "<number>",
          "createdAt": "<string>",
          "updatedAt": "<string>"
        }
      }
    }
  ```
- **Errors**:
  - **Status**: `400 Bad Request`
  - **Body**: 
  ```json
    {
      "error": {
        "code": "<string>",
        "timestamp": "<string>",
        "type": "<string>",
        "data": {
          "issues": [
            {
              "code": "<string>",
              "expected": "<string>",
              "received": "<string>",
              "path": [
                "<string>"
              ],
              "message": "<string>"
            }
          ],
          "name": "<string>"
        }
      }
    }
  ```

### Update Product
- **URL**: `/api/trpc/products`
- **Method**: `POST`
- **Procedure**: `update`
- **Request**:
  - **Body**: `JSON`
  ```json
    {
      "id": "<string>",
      "data": {
        "sku": "<string optional>",
        "slug": "<string optional>",
        "name": "<string optional>",
        "description": "<string optional>",
        "price": "<number decimal optional>",
        "imageUrl": "<string optional>",
        "stockQuantity": "<number optional>",
        "minimumOrderQuantity": "<number optional>",
      }
    }
  ```
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
    {
      "result": {
        "data": {
          "id": "<string>",
          "sku": "<string>",
          "slug": "<string>",
          "name": "<string>",
          "description": "<string>",
          "price": "<number decimal>",
          "imageUrl": "<string>",
          "stockQuantity": "<number>",
          "minimumOrderQuantity": "<number>",
          "createdAt": "<string>",
          "updatedAt": "<string>"
        }
      }
    }
  ```
- **Errors**:
  - **Status**: `400 Bad Request`
  - **Body**: 
  ```json
    {
      "error": {
        "code": "<string>",
        "timestamp": "<string>",
        "type": "<string>",
        "data": {
          "issues": [
            {
              "code": "<string>",
              "expected": "<string>",
              "received": "<string>",
              "path": [
                "<string>"
              ],
              "message": "<string>"
            }
          ],
          "name": "<string>"
        }
      }
    }
  ```

### Delete Product
- **URL**: `/api/trpc/products`
- **Method**: `POST`
- **Procedure**: `delete`
- **Request**:
  - **Body**: `JSON`
  ```json
    "string product id"
  ```
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
  ```json
    {
      "result": {
        "data": {
          "success": true
        }
      }
    }
  ```
- **Errors**:
  - **Status**: `404 Not Found`
  - **Body**: 
  ```json
    {
      "error": {
        "code": "<string>",
        "timestamp": "<string>",
        "type": "<string>"
      }
    }
  ```