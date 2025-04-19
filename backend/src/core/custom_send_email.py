from datetime import datetime

from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

from django.core.mail import send_mail


def send_html_email(to_email, subject, recipient_name, body_content, cta_link=None, cta_text=None, logo_url=None):
    html_content = render_to_string("emails/custom_email.html", {
        "subject": subject,
        "recipient_name": recipient_name,
        "body_content": body_content,
        "cta_link": cta_link,
        "cta_text": cta_text,
        "logo_url": logo_url,
        "year": datetime.now().year,
    })

    email = EmailMultiAlternatives(
        subject=subject,
        body=body_content,  # Fallback plain-text
        from_email=settings.FROM_EMAIL,
        to=[to_email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_newsletter_email(to_email, subject, recipient_name, body_content, cta_link, cta_text, logo_url):
    context = {
        'subject': subject,
        'recipient_name': recipient_name,
        'content': body_content,
        'cta_link': cta_link,
        'cta_text': cta_text,
        'logo_url': logo_url,
    }

    message = render_to_string('emails/newsletter.html', context)

    send_mail(
        subject,
        message,
        settings.FROM_EMAIL,
        [to_email],
        html_message=message,
    )


def send_email_message(to_email, subject, recipient_name, body_content, cta_link=None, cta_text=None, logo_url=None):
    context = {
        'subject': subject,
        'recipient_name': recipient_name,
        'content': body_content,
        'cta_link': cta_link,
        'cta_text': cta_text,
        'logo_url': logo_url,
    }

    message = render_to_string('emails/reply.html', context)
    send_mail()

    send_mail(
        subject,
        message,
        settings.FROM_EMAIL,
        [to_email],
        html_message=message,
    )


def send_vote_message(to_email, vote_count, recipient_name, body_content):
    subject = f"Prosfyges Chritian Network, Votes were {vote_count}"
    context = {
        'subject': subject,
        'recipient_name': recipient_name,
        'content': body_content,
    }

    message = render_to_string('emails/vote.html', context)

    send_mail(
        subject,
        message,
        settings.FROM_EMAIL,
        [to_email],
        html_message=message,
    )
