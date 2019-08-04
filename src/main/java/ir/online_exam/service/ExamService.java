package ir.online_exam.service;

import ir.online_exam.service.dto.ExamDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ir.online_exam.domain.Exam}.
 */
public interface ExamService {

    /**
     * Save a exam.
     *
     * @param examDTO the entity to save.
     * @return the persisted entity.
     */
    ExamDTO save(ExamDTO examDTO);

    /**
     * Get all the exams.
     *
     * @return the list of entities.
     */
    List<ExamDTO> findAll();


    /**
     * Get the "id" exam.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExamDTO> findOne(Long id);

    /**
     * Delete the "id" exam.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
