# Generated by Django 3.2.2 on 2021-05-10 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invSystem', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Authentication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
    ]