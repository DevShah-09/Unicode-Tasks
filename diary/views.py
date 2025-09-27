from .models import DiaryEntry
from .forms import DiaryForm
from django.shortcuts import render
from django.http import HttpResponseNotFound

def entry_list(request):
  entries=DiaryEntry.objects.all().order_by('-created_at')
  return render(request,'diary/entry_list.html',{'entries':entries})

def entry_detail(request,pk):
  try:
    curr=DiaryEntry.objects.get(id=pk)
  except DiaryEntry.DoesNotExist:
    return HttpResponseNotFound("Diary Entry Not Found !!!!")

  return render(request,'diary/entry_detail.html',{'curr':curr})

def entry_form_create(request):
  if request.method=='POST':
    form=DiaryForm(request.POST)
    if form.is_valid():
      curr=form.save()
      return render(request,'diary/entry_detail.html',{'curr':curr})
  else:
    form=DiaryForm()

  return render(request,'diary/entry_form.html',{'form':form})


def entry_form_update(request,pk):
  try:
    curr=DiaryEntry.objects.get(id=pk)
  except DiaryEntry.DoesNotExist:
    return HttpResponseNotFound("Diary Entry Not Found !!!!")
  
  if request.method=='POST':
    form=DiaryForm(request.POST,instance=curr)
    if form.is_valid():
      curr=form.save()
      return render(request,'diary/entry_detail.html',{'curr':curr})
  else:
    form=DiaryForm(instance=curr)

  return render(request,'diary/entry_form.html',{'form':form})

def entry_delete(request,pk):
  try:
    curr=DiaryEntry.objects.get(id=pk)
  except DiaryEntry.DoesNotExist:
    return HttpResponseNotFound("Diary Entry Not Found !!!!")
  
  if request.method=='POST':
    curr.delete()
    entries=DiaryEntry.objects.all().order_by('-created_at')
    return render(request,'diary/entry_list.html',{'entries':entries})
  
  return render(request,'diary/entry_delete.html',{'curr':curr})

  
  
  

  
