package br.ufpi.mybar_spring.exceptions.handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.ufpi.mybar_spring.dto.objects.erro.ErroDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.exceptions.custom.RequisicaoIlegal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntidadeNaoEncontrada.class)
    public ResponseEntity<ErroDto> handleEntidadeNaoEncontrada(
        EntidadeNaoEncontrada ex,
        HttpServletRequest request
    ) {
        
        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            HttpStatus.NOT_FOUND.getReasonPhrase(),
            ex.getMessage(),
            request.getRequestURI()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(erro);
    }

    @ExceptionHandler(RequisicaoIlegal.class)
    public ResponseEntity<ErroDto> handleRequisicaoIlegal(
        RequisicaoIlegal ex,
        HttpServletRequest request
    ) {
        
        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            ex.getMessage(),
            request.getRequestURI()
        );

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroDto> handleValidation(
        MethodArgumentNotValidException  ex,
        HttpServletRequest request
    ){
        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            "O corpo da requisição não corresponde a um objeto",
            request.getRequestURI()
        );

        return ResponseEntity
            .badRequest()
            .body(erro);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErroDto> handleValidation(
        ConstraintViolationException  ex,
        HttpServletRequest request
    ){

        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            "O corpo da requição não corresponde um objeto",
            request.getRequestURI()
        );

        return ResponseEntity
            .badRequest()
            .body(erro);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroDto> handleHttpMessageNotReadable(
        HttpMessageNotReadableException ex,
        HttpServletRequest request) {

    ErroDto error = new ErroDto(
        LocalDateTime.now(),
        HttpStatus.BAD_REQUEST.value(),
        HttpStatus.BAD_REQUEST.getReasonPhrase(),
        "Corpo da requisição inválido ou mal formatado",
        request.getRequestURI()
    );

    return ResponseEntity.badRequest().body(error);
}


}
