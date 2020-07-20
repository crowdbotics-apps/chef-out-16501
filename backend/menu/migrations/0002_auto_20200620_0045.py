# Generated by Django 2.2.13 on 2020-06-19 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='icon',
            field=models.ImageField(upload_to='uploads/category_icon/'),
        ),
        migrations.AlterField(
            model_name='category',
            name='image',
            field=models.ImageField(upload_to='uploads/category/'),
        ),
        migrations.AlterField(
            model_name='country',
            name='flag',
            field=models.ImageField(upload_to='uploads/country/'),
        ),
        migrations.AlterField(
            model_name='item',
            name='image',
            field=models.ImageField(upload_to='uploads/category_item/'),
        ),
        migrations.AlterField(
            model_name='itemvariant',
            name='image',
            field=models.ImageField(upload_to='uploads/item_varient/'),
        ),
    ]