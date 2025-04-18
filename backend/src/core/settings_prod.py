import os
from pathlib import Path
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["prosfyges-christian-network.org",
                 "www.prosfyges-christian-network.org", "localhost"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'mdeditor',
    'whitenoise',
    'corsheaders',
    'rest_framework',

    # Local apps
    'base.apps.BaseConfig',
    'blogs.apps.BlogsConfig',
    'events.apps.EventsConfig',
    'accounts.apps.AccountsConfig',
    'payments.apps.PaymentsConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  #
    'django.contrib.sessions.middleware.SessionMiddleware',
    # corsheader
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR, "../../frontend/dist", BASE_DIR, "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'USER': os.getenv('DB_USER', 'ukasha'),
        'NAME': os.getenv('DB_NAME', 'webdb'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'db-access'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = "Africa/Kampala"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / '../../frontend/dist/assets']  # for development
STATIC_ROOT = BASE_DIR / 'staticfiles'    # for collectstatic in production

# Media files (uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ]]]]]]]]]]]]] CUSTOMIZATIONS
AUTH_USER_MODEL = 'accounts.CustomUser'

X_FRAME_OPTIONS = 'SAMEORIGIN'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

CORS_ALLOWED_ORIGINS = [
    "https://prosfyges-christian-network.org",
    "https://www.prosfyges-christian-network.org",
    "http://localhost:5173",
]


MDEDITOR_CONFIGS = {
    'default': {
        'width': '90% ',  # Custom edit box width
        'height': 500,  # Custom edit box height
        'toolbar': [
            "undo", "redo", "|",
            "bold", "italic", "quote", "|",
            "h1", "h2", "h3", "|",
            "list-ul", "list-ol", "hr", "|",
            "link", "image", "|",
            "preview", "fullscreen"
        ],
        # image upload format type
        'upload_image_formats': ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        'image_folder': 'editor',  # image save the folder name
        'theme': 'default',  # edit box theme, dark / default
        'preview_theme': 'default',  # Preview area theme, dark / default
        'editor_theme': 'default',  # edit area theme, pastel-on-dark / default
        'toolbar_autofixed': True,  # Whether the toolbar capitals
        'search_replace': True,  # Whether to open the search for replacement
        'emoji': True,  # whether to open the expression function
        'tex': True,  # whether to open the tex chart function
        'flow_chart': True,  # whether to open the flow chart function
        'sequence': True,  # Whether to open the sequence diagram function
        'watch': True,  # Live preview
        'lineWrapping': False,  # lineWrapping
        'lineNumbers': False,  # lineNumbers
        'language': 'zh'  # zh / en / es
    }
}


EMAIL_BACKEND = 'django_mailjet.backends.MailjetBackend'
MAILJET_API_KEY = config('MAILJET_API_KEY')
MAILJET_API_SECRET = config("MAILJET_API_SECRET")
EMAIL_HOST = 'in-v3.mailjet.com'
EMAIL_PORT = config("EMAIL_PORT")
EMAIL_USE_TLS = config("EMAIL_USE_TLS")
EMAIL_USE_SSL = config("EMAIL_USE_SSL")
EMAIL_TIMEOUT = 30
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')
FROM_EMAIL = 'mail@prosfyges-christian-network.org'

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",  # DB 1 in Redis
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'file': {
#             'level': 'WARNING',
#             'class': 'logging.FileHandler',
#             'filename': '/home/web_user/logs/django.log',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['file'],
#             'level': 'WARNING',
#             'propagate': True,
#         },
#     },
# }

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True


CSRF_TRUSTED_ORIGINS = [
    "https://prosfyges-christian-network.org",
    "https://www.prosfyges-christian-network.org",
]

SESSION_COOKIE_AGE = 900  # 15 minutes
SESSION_EXPIRE_AT_BROWSER_CLOSE = True


# [[[[[[[[[[[[[ LIVE BOX ]]]]]]]]]]]]]
PESAPAL_CONSUMER_KEY = config('PESAPAL_CONSUMER_KEY')
PESAPAL_CONSUMER_SECRET = config('PESAPAL_CONSUMER_SECRET')
PESAPAL_IPN_ID = config('PESAPAL_IPN_ID')

GET_PESAPAL_AUTH_TOKEN_URL = "https://pay.pesapal.com/v3/api/Auth/RequestToken"
SUBMIT_PESAPAL_ORDER_REQ_URL = "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest"
GET_PESAPAL_TRANSACTION_STATUS_URL = "https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus"


REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

MAX_UPLOAD_SIZE = 900 * 1024
