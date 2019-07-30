package ir.online_exam.service;

import ir.online_exam.domain.Question;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Question}.
 */
public interface QuestionService {

    /**
     * Save a question.
     *
     * @param question the entity to save.
     * @return the persisted entity.
     */
    Question save(Question question);

    /**
     * Get all the questions.
     *
     * @return the list of entities.
     */
    List<Question> findAll();


    /**
     * Get the "id" question.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Question> findOne(Long id);

    /**
     * Delete the "id" question.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
