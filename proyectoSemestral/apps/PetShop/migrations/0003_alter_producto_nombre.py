# Generated by Django 4.2.2 on 2023-06-12 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PetShop', '0002_alter_producto_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='nombre',
            field=models.CharField(max_length=44),
        ),
    ]