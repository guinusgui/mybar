package br.ufpi.mybar_spring.exceptions.custom;

public class RequisicaoIlegal extends RuntimeException{
    
    public RequisicaoIlegal(String message) {
        super(message);
    }

    public RequisicaoIlegal(String message, Throwable cause) {
        super(message, cause);
    }
}
