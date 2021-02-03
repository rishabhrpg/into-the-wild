#!/bin/bash
set -e

echo "Creating env file"

cp ./src/environments/environment.example.ts ./src/environments/environment.ts
cp ./src/environments/environment.example.ts ./src/environments/environment.prod.ts

echo "API_URL is :$API_URL"
echo "DATABASE_URL is :$DATABASE_URL"
echo "PROJECT_ID is :$PROJECT_ID"

sed -i "s|http://api.url.com|$API_URL|g" ./src/environments/environment.prod.ts
sed -i "s|database_url|$DATABASE_URL|g" ./src/environments/environment.prod.ts
sed -i "s|project_id|$PROJECT_ID|g" ./src/environments/environment.prod.ts

echo "List files"
ls -al ./src/environments/

echo "Done!"
