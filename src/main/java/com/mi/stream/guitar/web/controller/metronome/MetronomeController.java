package com.mi.stream.guitar.web.controller.metronome;

import com.mi.stream.guitar.web.controller.base.BaseController;
import com.mi.stream.guitar.web.service.metronome.MetronomeService;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Metronome
 *
 * @author mi zxq
 * @date 2019/10/28 10:22
 */
@Controller
@RequestMapping(value = "/metronome")
public class MetronomeController extends BaseController<String> {
    
    @Resource(name = "metronomeService")
    private MetronomeService metronomeService;
    
    @GetMapping(value = "/")
    public String metronome() {
        return "metronome/metronome";
    }
    
}
