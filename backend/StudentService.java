package com.example.student.Service;

import com.example.student.Model.Student;
import com.example.student.Repository.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public Student create(Student student) {
        return repository.save(student);
    }

    public Optional<Student> getById(String id) {
        return repository.findById(id);
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public Optional<Student> update(String id, Student updatedStudent) {
        return repository.findById(id).map(existingStudent -> {
            existingStudent.setName(updatedStudent.getName());
            return repository.save(existingStudent);
        });
    }

    public boolean delete(String id) {
        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);
        return true;
    }

}
