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
claudia update --handler lambda.handler --deploy-proxy-api --region $AWS_DEFAULT_REGION --profile claudia
deployed url: https://4hxxxlduse.execute-api.ap-south-1.amazonaws.com/latest

#To Do
Setup travis for autodeployment

