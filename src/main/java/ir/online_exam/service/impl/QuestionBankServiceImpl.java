package ir.online_exam.service.impl;

import ir.online_exam.service.QuestionBankService;
import ir.online_exam.domain.QuestionBank;
import ir.online_exam.repository.QuestionBankRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link QuestionBank}.
 */
@Service
@Transactional
public class QuestionBankServiceImpl implements QuestionBankService {

    private final Logger log = LoggerFactory.getLogger(QuestionBankServiceImpl.class);

    private final QuestionBankRepository questionBankRepository;

    public QuestionBankServiceImpl(QuestionBankRepository questionBankRepository) {
        this.questionBankRepository = questionBankRepository;
    }

    /**
     * Save a questionBank.
     *
     * @param questionBank the entity to save.
     * @return the persisted entity.
     */
    @Override
    public QuestionBank save(QuestionBank questionBank) {
        log.debug("Request to save QuestionBank : {}", questionBank);
        return questionBankRepository.save(questionBank);
    }

    /**
     * Get all the questionBanks.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<QuestionBank> findAll() {
        log.debug("Request to get all QuestionBanks");
        return questionBankRepository.findAll();
    }


    /**
     * Get one questionBank by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<QuestionBank> findOne(Long id) {
        log.debug("Request to get QuestionBank : {}", id);
        return questionBankRepository.findById(id);
    }

    /**
     * Delete the questionBank by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuestionBank : {}", id);
        questionBankRepository.deleteById(id);
    }
}
