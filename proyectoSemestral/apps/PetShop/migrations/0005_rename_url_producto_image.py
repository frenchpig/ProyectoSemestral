# Generated by Django 4.2.2 on 2023-06-13 00:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('PetShop', '0004_alter_producto_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='url',
            new_name='image',
        ),
    ]
