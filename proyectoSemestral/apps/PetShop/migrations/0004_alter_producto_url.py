# Generated by Django 4.2.2 on 2023-06-13 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PetShop', '0003_alter_producto_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='url',
            field=models.ImageField(upload_to='prodImg'),
        ),
    ]
