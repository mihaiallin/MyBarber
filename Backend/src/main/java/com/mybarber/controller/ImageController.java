package com.mybarber.controller;

import com.mybarber.model.Image;
import com.mybarber.model.User;
import com.mybarber.repository.ImageRepository;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Value("${image.upload.directory}")
    private String uploadDirectory;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if(file == null || !file.getContentType().startsWith("image")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only image files are allowed.");
            }

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String filePath = Paths.get(uploadDirectory, fileName).toString();
            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

            // Save image metadata to database
            Image image = Image.builder()
                    .fileName(fileName)
                    .filePath(filePath)
                    .build();
            imageRepository.save(image);

            return ResponseEntity.ok().body("Image uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getImage(@PathVariable Long id) {
        try {
            Image image = imageRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Image not found with id: " + id));

            Path filePath = Paths.get(image.getFilePath());
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Adjust content type as needed
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping()
    public ResponseEntity<List<Image>> getAllPhotos() {
        try {
            List<Image> images = imageRepository.findAll();
            return ResponseEntity.ok().body(images);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePhoto(@PathVariable Long id) {
        try {
            Image image = imageRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Image not found with id: " + id));

            // Delete file from folder
            Path filePath = Paths.get(image.getFilePath());
            Files.deleteIfExists(filePath);

            // Delete image from database
            imageRepository.delete(image);

            return ResponseEntity.ok().body("Image deleted successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete image");
        }
    }
}
