package ir.online_exam.service;

import ir.online_exam.service.dto.QuestionBankDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ir.online_exam.domain.QuestionBank}.
 */
public interface QuestionBankService {

    /**
     * Save a questionBank.
     *
     * @param questionBankDTO the entity to save.
     * @return the persisted entity.
     */
    QuestionBankDTO save(QuestionBankDTO questionBankDTO);

    /**
     * Get all the questionBanks.
     *
     * @return the list of entities.
     */
    List<QuestionBankDTO> findAll();


    /**
     * Get the "id" questionBank.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuestionBankDTO> findOne(Long id);

    /**
     * Delete the "id" questionBank.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
