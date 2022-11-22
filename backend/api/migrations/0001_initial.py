# Generated by Django 4.1.1 on 2022-11-22 17:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Utilizador",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(max_length=20)),
                ("password", models.CharField(max_length=20)),
                ("bio", models.CharField(blank=True, max_length=256)),
                ("email", models.EmailField(max_length=50)),
                (
                    "profile_pic",
                    models.ImageField(
                        blank=True, default="default.png", upload_to="profile_pics"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Post",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("caption", models.CharField(max_length=100)),
                ("image", models.ImageField(blank=True, upload_to="post_pics")),
                ("like_count", models.IntegerField(default=0)),
                ("comment_count", models.IntegerField(default=0)),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "likes",
                    models.ManyToManyField(
                        blank=True,
                        default=None,
                        related_name="likes",
                        to="api.utilizador",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.utilizador"
                    ),
                ),
            ],
            options={
                "ordering": ["-date"],
            },
        ),
        migrations.CreateModel(
            name="Follow",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "following",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="following",
                        to="api.utilizador",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user",
                        to="api.utilizador",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Comment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("comment", models.CharField(max_length=100)),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "post",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.post"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.utilizador"
                    ),
                ),
            ],
            options={
                "ordering": ["-date"],
            },
        ),
    ]
