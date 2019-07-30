package ir.online_exam.service;

import ir.online_exam.domain.Exam;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Exam}.
 */
public interface ExamService {

    /**
     * Save a exam.
     *
     * @param exam the entity to save.
     * @return the persisted entity.
     */
    Exam save(Exam exam);

    /**
     * Get all the exams.
     *
     * @return the list of entities.
     */
    List<Exam> findAll();


    /**
     * Get the "id" exam.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Exam> findOne(Long id);

    /**
     * Delete the "id" exam.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
