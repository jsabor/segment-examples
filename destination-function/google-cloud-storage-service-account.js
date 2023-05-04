//authentication from service account, user can create custom roles that include storage.objects.create & storage.objects.delete
//create setting in Segment for serviceAccountFile, bucketName
  const saKeyJson = JSON.parse(settings.serviceAccountFile);
  const PROJECT_ID = settings.projectId;

  const storage = new google.cloud.storage.Storage({
    projectId: PROJECT_ID,
    credentials: {
      type: saKeyJson.type,
      project_id: saKeyJson.project_id,
      private_key_id: saKeyJson.private_key_id,
      client_email: saKeyJson.client_email,
      private_key: saKeyJson.private_key,
      client_id: saKeyJson.client_id,
      auth_uri: saKeyJson.auth_uri,
      token_uri: saKeyJson.token_uri,
      auth_provider_x509_cert_url: saKeyJson.auth_provider_x509_cert_url,
      client_x509_cert_url: saKeyJson.client_x509_cert_url,
    },
  });

  //locate bucket and name file
  const bucket = storage.bucket(settings.bucketName);
  const file = bucket.file("file_" + `${yearMonthDay}`);

  //if file exists download and append row to file, else if file is not present, create new file with following contents
  const exists = await file.exists();
  console.log(exists);
