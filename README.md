# json-to-cloudformation-options-action
Convert a json file to the string format needed by cloudformation.

## Example
also uses read json property to just read location of artifact and upload to s3 bucket
```
- name: Read Properties
  id: read_property
  uses:  ashley-taylor/read-json-property-action@v1.0
  with:
    path: target/cf.conf
    property: artifact
- name: Read Cloud formation Properties
  id: cf
  uses:  ashley-taylor/json-to-cloudformation-options-action@v1.0
  with:
    path: target/cf.conf
- name: Upload to S3
  run: aws s3 cp target/${{ steps.read_property.outputs.value }} s3://example-bucket/bfp/${{ steps.read_property.outputs.value }}
- name: Update AWS
  run: aws cloudformation deploy --template-file cf.json --stack-name example-stack --parameter-overrides ${{ steps.cf.outputs.value }} --capabilities "CAPABILITY_IAM"
      ```
