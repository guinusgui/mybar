package br.ufpi.mybar_spring.dto.mapper;


import br.ufpi.mybar_spring.dto.objects.conta.ContaRequestDto;
import br.ufpi.mybar_spring.dto.objects.conta.ContaResponseDto;
import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.models.conta.Conta;
import br.ufpi.mybar_spring.models.usuario.Usuario;



public class ContaMapper{

    public static ContaResponseDto toDto(Conta c) {
        return new ContaResponseDto(
            c.getNumero(),
            c.getStatus(),
            c.getData_da_abertura(),
            c.getHora_da_abertura(),
            c.getDono(),
            c.getQuem_abriu(),
            c.getItens_pendentes()
        );
    }

    public static Conta toEntity(ContaRequestDto dto, Cliente c, Usuario u) {

        Conta con = new Conta();
        con.setNumero(dto.numero());
        con.setStatus(dto.status());
        con.setDono(c);
        con.setQuem_abriu(u);

        return con;
    }
}
