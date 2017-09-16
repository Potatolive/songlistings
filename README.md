*API to search movie songs based on movie title or song title*

# Get started
To start swagger project:
> swagger project start

To edit swagger documentation:
> swagger project edit

# Configutation:
All aws configuration is handled using environment variables. 

1. AWS_DEFAULT_REGION
2. AWS_ACCESS_KEY_ID
3. AWS_SECRET_ACCESS_KEY

#deployment
deployed url: https://4hxxxlduse.execute-api.ap-south-1.amazonaws.com/latest

#To Do
1. Setup travis for autodeployment
2. Unit & E2E testing
3. Create CRUD for songs & use this from scraper. Scraper should not be putting the data directly to dynamodb table
