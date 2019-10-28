package com.mi.stream.guitar.web.controller.metronome;

import com.mi.stream.guitar.web.controller.base.BaseController;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;

/**
 * Metronome
 *
 * @author mi zxq
 * @date 2019/10/28 10:22
 */
@Controller
public class Metronome extends BaseController {
    
    public Metronome(HttpServletRequest request, HttpServletRequest response) {
        super(request, response);
    }
}
