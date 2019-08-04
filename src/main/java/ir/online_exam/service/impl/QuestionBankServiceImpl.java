package ir.online_exam.service.impl;

import ir.online_exam.service.QuestionBankService;
import ir.online_exam.domain.QuestionBank;
import ir.online_exam.repository.QuestionBankRepository;
import ir.online_exam.service.dto.QuestionBankDTO;
import ir.online_exam.service.mapper.QuestionBankMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link QuestionBank}.
 */
@Service
@Transactional
public class QuestionBankServiceImpl implements QuestionBankService {

    private final Logger log = LoggerFactory.getLogger(QuestionBankServiceImpl.class);

    private final QuestionBankRepository questionBankRepository;

    private final QuestionBankMapper questionBankMapper;

    public QuestionBankServiceImpl(QuestionBankRepository questionBankRepository, QuestionBankMapper questionBankMapper) {
        this.questionBankRepository = questionBankRepository;
        this.questionBankMapper = questionBankMapper;
    }

    /**
     * Save a questionBank.
     *
     * @param questionBankDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public QuestionBankDTO save(QuestionBankDTO questionBankDTO) {
        log.debug("Request to save QuestionBank : {}", questionBankDTO);
        QuestionBank questionBank = questionBankMapper.toEntity(questionBankDTO);
        questionBank = questionBankRepository.save(questionBank);
        return questionBankMapper.toDto(questionBank);
    }

    /**
     * Get all the questionBanks.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<QuestionBankDTO> findAll() {
        log.debug("Request to get all QuestionBanks");
        return questionBankRepository.findAll().stream()
            .map(questionBankMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one questionBank by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<QuestionBankDTO> findOne(Long id) {
        log.debug("Request to get QuestionBank : {}", id);
        return questionBankRepository.findById(id)
            .map(questionBankMapper::toDto);
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
