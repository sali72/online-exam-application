package ir.online_exam.service;

import ir.online_exam.domain.Teacher;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Teacher}.
 */
public interface TeacherService {

    /**
     * Save a teacher.
     *
     * @param teacher the entity to save.
     * @return the persisted entity.
     */
    Teacher save(Teacher teacher);

    /**
     * Get all the teachers.
     *
     * @return the list of entities.
     */
    List<Teacher> findAll();


    /**
     * Get the "id" teacher.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Teacher> findOne(Long id);

    /**
     * Delete the "id" teacher.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
