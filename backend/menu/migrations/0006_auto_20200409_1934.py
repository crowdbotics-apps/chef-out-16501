# Generated by Django 2.2.11 on 2020-04-09 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0005_review'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
        migrations.AlterField(
            model_name='item',
            name='image',
            field=models.URLField(),
        ),
    ]
