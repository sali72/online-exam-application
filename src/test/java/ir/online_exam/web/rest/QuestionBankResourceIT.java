package ir.online_exam.web.rest;

import ir.online_exam.OnlineExamApplicationApp;
import ir.online_exam.domain.QuestionBank;
import ir.online_exam.repository.QuestionBankRepository;
import ir.online_exam.service.QuestionBankService;
import ir.online_exam.service.dto.QuestionBankDTO;
import ir.online_exam.service.mapper.QuestionBankMapper;
import ir.online_exam.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static ir.online_exam.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link QuestionBankResource} REST controller.
 */
@SpringBootTest(classes = OnlineExamApplicationApp.class)
public class QuestionBankResourceIT {

    @Autowired
    private QuestionBankRepository questionBankRepository;

    @Autowired
    private QuestionBankMapper questionBankMapper;

    @Autowired
    private QuestionBankService questionBankService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restQuestionBankMockMvc;

    private QuestionBank questionBank;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionBankResource questionBankResource = new QuestionBankResource(questionBankService);
        this.restQuestionBankMockMvc = MockMvcBuilders.standaloneSetup(questionBankResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionBank createEntity(EntityManager em) {
        QuestionBank questionBank = new QuestionBank();
        return questionBank;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionBank createUpdatedEntity(EntityManager em) {
        QuestionBank questionBank = new QuestionBank();
        return questionBank;
    }

    @BeforeEach
    public void initTest() {
        questionBank = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestionBank() throws Exception {
        int databaseSizeBeforeCreate = questionBankRepository.findAll().size();

        // Create the QuestionBank
        QuestionBankDTO questionBankDTO = questionBankMapper.toDto(questionBank);
        restQuestionBankMockMvc.perform(post("/api/question-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionBankDTO)))
            .andExpect(status().isCreated());

        // Validate the QuestionBank in the database
        List<QuestionBank> questionBankList = questionBankRepository.findAll();
        assertThat(questionBankList).hasSize(databaseSizeBeforeCreate + 1);
        QuestionBank testQuestionBank = questionBankList.get(questionBankList.size() - 1);
    }

    @Test
    @Transactional
    public void createQuestionBankWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionBankRepository.findAll().size();

        // Create the QuestionBank with an existing ID
        questionBank.setId(1L);
        QuestionBankDTO questionBankDTO = questionBankMapper.toDto(questionBank);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionBankMockMvc.perform(post("/api/question-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionBankDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionBank in the database
        List<QuestionBank> questionBankList = questionBankRepository.findAll();
        assertThat(questionBankList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuestionBanks() throws Exception {
        // Initialize the database
        questionBankRepository.saveAndFlush(questionBank);

        // Get all the questionBankList
        restQuestionBankMockMvc.perform(get("/api/question-banks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionBank.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getQuestionBank() throws Exception {
        // Initialize the database
        questionBankRepository.saveAndFlush(questionBank);

        // Get the questionBank
        restQuestionBankMockMvc.perform(get("/api/question-banks/{id}", questionBank.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(questionBank.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestionBank() throws Exception {
        // Get the questionBank
        restQuestionBankMockMvc.perform(get("/api/question-banks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestionBank() throws Exception {
        // Initialize the database
        questionBankRepository.saveAndFlush(questionBank);

        int databaseSizeBeforeUpdate = questionBankRepository.findAll().size();

        // Update the questionBank
        QuestionBank updatedQuestionBank = questionBankRepository.findById(questionBank.getId()).get();
        // Disconnect from session so that the updates on updatedQuestionBank are not directly saved in db
        em.detach(updatedQuestionBank);
        QuestionBankDTO questionBankDTO = questionBankMapper.toDto(updatedQuestionBank);

        restQuestionBankMockMvc.perform(put("/api/question-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionBankDTO)))
            .andExpect(status().isOk());

        // Validate the QuestionBank in the database
        List<QuestionBank> questionBankList = questionBankRepository.findAll();
        assertThat(questionBankList).hasSize(databaseSizeBeforeUpdate);
        QuestionBank testQuestionBank = questionBankList.get(questionBankList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestionBank() throws Exception {
        int databaseSizeBeforeUpdate = questionBankRepository.findAll().size();

        // Create the QuestionBank
        QuestionBankDTO questionBankDTO = questionBankMapper.toDto(questionBank);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionBankMockMvc.perform(put("/api/question-banks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questionBankDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionBank in the database
        List<QuestionBank> questionBankList = questionBankRepository.findAll();
        assertThat(questionBankList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestionBank() throws Exception {
        // Initialize the database
        questionBankRepository.saveAndFlush(questionBank);

        int databaseSizeBeforeDelete = questionBankRepository.findAll().size();

        // Delete the questionBank
        restQuestionBankMockMvc.perform(delete("/api/question-banks/{id}", questionBank.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuestionBank> questionBankList = questionBankRepository.findAll();
        assertThat(questionBankList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionBank.class);
        QuestionBank questionBank1 = new QuestionBank();
        questionBank1.setId(1L);
        QuestionBank questionBank2 = new QuestionBank();
        questionBank2.setId(questionBank1.getId());
        assertThat(questionBank1).isEqualTo(questionBank2);
        questionBank2.setId(2L);
        assertThat(questionBank1).isNotEqualTo(questionBank2);
        questionBank1.setId(null);
        assertThat(questionBank1).isNotEqualTo(questionBank2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuestionBankDTO.class);
        QuestionBankDTO questionBankDTO1 = new QuestionBankDTO();
        questionBankDTO1.setId(1L);
        QuestionBankDTO questionBankDTO2 = new QuestionBankDTO();
        assertThat(questionBankDTO1).isNotEqualTo(questionBankDTO2);
        questionBankDTO2.setId(questionBankDTO1.getId());
        assertThat(questionBankDTO1).isEqualTo(questionBankDTO2);
        questionBankDTO2.setId(2L);
        assertThat(questionBankDTO1).isNotEqualTo(questionBankDTO2);
        questionBankDTO1.setId(null);
        assertThat(questionBankDTO1).isNotEqualTo(questionBankDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(questionBankMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(questionBankMapper.fromId(null)).isNull();
    }
}
