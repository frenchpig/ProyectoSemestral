# Generated by Django 4.2.2 on 2023-06-24 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PetShop', '0005_rename_url_producto_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='userToken',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
