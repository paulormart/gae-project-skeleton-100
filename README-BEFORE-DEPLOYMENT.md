

# 1. Verify that the domain where you pretend to upload last version is avaialable in settings.py
# ALLOWED_HOSTS = ['localhost','gae-project-skeleton.appspot.com']

# 2. Confirm under  templates/base.html the path for the urls in production

# 3. Confirm in app.yaml that the project Id and the static roots are correct

# 4. Run Grunt under assets/

>> run
grunt build

# 5. Upload app to GoogleAppEngine via GoogleAppEngineLauncher

# Note: Currently static files are being served via app engine
# There is no need to upload to GoogleCloudStorage
# But in case we want to upload static files to GoogleCloudStorage run the following command

>> run 
gsutil cp -R -z html,js,css -a public-read ./assets/_build/ gs://gae-project-skeleton/static
