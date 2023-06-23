import locale
from django import template

register = template.Library()

@register.filter
def format_price(value):
    price = float(value)
    locale.setlocale(locale.LC_ALL, 'es_CL.UTF-8')
    formatted_value = locale.format_string('%.0f', price, grouping=True)
    return formatted_value