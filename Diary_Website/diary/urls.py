from . import views
from django.urls import path

urlpatterns = [
    path('',views.entry_list,name="entry_list"),
    path('<int:pk>',views.entry_detail,name="entry_detail"),
    path('new/',views.entry_form_create,name="entry_form_create"),
    path('<int:pk>/edit/',views.entry_form_update,name="entry_form_update"),
    path('<int:pk>/delete/',views.entry_delete,name="entry_delete")
]
