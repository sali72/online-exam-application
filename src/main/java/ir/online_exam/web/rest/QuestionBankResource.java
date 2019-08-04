package ir.online_exam.web.rest;

import ir.online_exam.service.QuestionBankService;
import ir.online_exam.web.rest.errors.BadRequestAlertException;
import ir.online_exam.service.dto.QuestionBankDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ir.online_exam.domain.QuestionBank}.
 */
@RestController
@RequestMapping("/api")
public class QuestionBankResource {

    private final Logger log = LoggerFactory.getLogger(QuestionBankResource.class);

    private static final String ENTITY_NAME = "questionBank";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionBankService questionBankService;

    public QuestionBankResource(QuestionBankService questionBankService) {
        this.questionBankService = questionBankService;
    }

    /**
     * {@code POST  /question-banks} : Create a new questionBank.
     *
     * @param questionBankDTO the questionBankDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionBankDTO, or with status {@code 400 (Bad Request)} if the questionBank has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/question-banks")
    public ResponseEntity<QuestionBankDTO> createQuestionBank(@RequestBody QuestionBankDTO questionBankDTO) throws URISyntaxException {
        log.debug("REST request to save QuestionBank : {}", questionBankDTO);
        if (questionBankDTO.getId() != null) {
            throw new BadRequestAlertException("A new questionBank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuestionBankDTO result = questionBankService.save(questionBankDTO);
        return ResponseEntity.created(new URI("/api/question-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /question-banks} : Updates an existing questionBank.
     *
     * @param questionBankDTO the questionBankDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionBankDTO,
     * or with status {@code 400 (Bad Request)} if the questionBankDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionBankDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/question-banks")
    public ResponseEntity<QuestionBankDTO> updateQuestionBank(@RequestBody QuestionBankDTO questionBankDTO) throws URISyntaxException {
        log.debug("REST request to update QuestionBank : {}", questionBankDTO);
        if (questionBankDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuestionBankDTO result = questionBankService.save(questionBankDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, questionBankDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /question-banks} : get all the questionBanks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionBanks in body.
     */
    @GetMapping("/question-banks")
    public List<QuestionBankDTO> getAllQuestionBanks() {
        log.debug("REST request to get all QuestionBanks");
        return questionBankService.findAll();
    }

    /**
     * {@code GET  /question-banks/:id} : get the "id" questionBank.
     *
     * @param id the id of the questionBankDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionBankDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/question-banks/{id}")
    public ResponseEntity<QuestionBankDTO> getQuestionBank(@PathVariable Long id) {
        log.debug("REST request to get QuestionBank : {}", id);
        Optional<QuestionBankDTO> questionBankDTO = questionBankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(questionBankDTO);
    }

    /**
     * {@code DELETE  /question-banks/:id} : delete the "id" questionBank.
     *
     * @param id the id of the questionBankDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/question-banks/{id}")
    public ResponseEntity<Void> deleteQuestionBank(@PathVariable Long id) {
        log.debug("REST request to delete QuestionBank : {}", id);
        questionBankService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
