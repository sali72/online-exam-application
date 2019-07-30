package ir.online_exam.web.rest;

import ir.online_exam.domain.QuestionBank;
import ir.online_exam.service.QuestionBankService;
import ir.online_exam.web.rest.errors.BadRequestAlertException;

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
     * @param questionBank the questionBank to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionBank, or with status {@code 400 (Bad Request)} if the questionBank has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/question-banks")
    public ResponseEntity<QuestionBank> createQuestionBank(@RequestBody QuestionBank questionBank) throws URISyntaxException {
        log.debug("REST request to save QuestionBank : {}", questionBank);
        if (questionBank.getId() != null) {
            throw new BadRequestAlertException("A new questionBank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuestionBank result = questionBankService.save(questionBank);
        return ResponseEntity.created(new URI("/api/question-banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /question-banks} : Updates an existing questionBank.
     *
     * @param questionBank the questionBank to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionBank,
     * or with status {@code 400 (Bad Request)} if the questionBank is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionBank couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/question-banks")
    public ResponseEntity<QuestionBank> updateQuestionBank(@RequestBody QuestionBank questionBank) throws URISyntaxException {
        log.debug("REST request to update QuestionBank : {}", questionBank);
        if (questionBank.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuestionBank result = questionBankService.save(questionBank);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, questionBank.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /question-banks} : get all the questionBanks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionBanks in body.
     */
    @GetMapping("/question-banks")
    public List<QuestionBank> getAllQuestionBanks() {
        log.debug("REST request to get all QuestionBanks");
        return questionBankService.findAll();
    }

    /**
     * {@code GET  /question-banks/:id} : get the "id" questionBank.
     *
     * @param id the id of the questionBank to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionBank, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/question-banks/{id}")
    public ResponseEntity<QuestionBank> getQuestionBank(@PathVariable Long id) {
        log.debug("REST request to get QuestionBank : {}", id);
        Optional<QuestionBank> questionBank = questionBankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(questionBank);
    }

    /**
     * {@code DELETE  /question-banks/:id} : delete the "id" questionBank.
     *
     * @param id the id of the questionBank to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/question-banks/{id}")
    public ResponseEntity<Void> deleteQuestionBank(@PathVariable Long id) {
        log.debug("REST request to delete QuestionBank : {}", id);
        questionBankService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
