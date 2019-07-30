package ir.online_exam.service;

import ir.online_exam.domain.QuestionBank;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link QuestionBank}.
 */
public interface QuestionBankService {

    /**
     * Save a questionBank.
     *
     * @param questionBank the entity to save.
     * @return the persisted entity.
     */
    QuestionBank save(QuestionBank questionBank);

    /**
     * Get all the questionBanks.
     *
     * @return the list of entities.
     */
    List<QuestionBank> findAll();


    /**
     * Get the "id" questionBank.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuestionBank> findOne(Long id);

    /**
     * Delete the "id" questionBank.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
