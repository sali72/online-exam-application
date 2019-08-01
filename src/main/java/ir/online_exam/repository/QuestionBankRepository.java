package ir.online_exam.repository;

import ir.online_exam.domain.QuestionBank;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuestionBank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {

}
