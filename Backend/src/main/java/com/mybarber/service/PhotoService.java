//package com.mybarber.service;
//
//import com.mybarber.model.Photo;
//import com.mybarber.repository.PhotoRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class PhotoService {
//
//    @Autowired
//    private PhotoRepository photoRepository;
//
//    public Photo createPhoto(Photo photo) {
//        return photoRepository.save(photo);
//    }
//
//    public Photo getPhotoById(Long id){
//        return photoRepository.findById(id).orElse(null);
//    }
//}
