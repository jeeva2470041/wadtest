
package com.example.student.Repository;

import com.example.student.Model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository 
public interface StudentRepository extends
        MongoRepository<Student, String> {
}
